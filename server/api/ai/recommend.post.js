import { authMiddleware } from '~/server/utils/auth.js'
import Vehicle from '~/server/models/Vehicle.js'

export default defineEventHandler(async (event) => {
  try {
    await authMiddleware(event)

    const body = await readBody(event)
    const { destination, description, startDate, endDate } = body

    if (!destination || !description) {
      throw createError({
        statusCode: 400,
        message: 'Destination et description sont requises'
      })
    }

    // Récupérer les véhicules disponibles
    const availableVehicles = await Vehicle.find({ status: 'available' })

    if (availableVehicles.length === 0) {
      return {
        success: true,
        recommendations: [],
        message: 'Aucun véhicule disponible pour le moment'
      }
    }

    // Préparer les informations des véhicules pour Gemini
    const vehiclesInfo = availableVehicles.map(v => ({
      id: v._id.toString(),
      brand: v.brand,
      model: v.model,
      year: v.year,
      type: v.type,
      seats: v.seats,
      mileage: v.mileage,
      description: v.description || ''
    }))

    // Appeler l'API Gemini
    const geminiApiKey = 'AIzaSyBBZ-XOVhT4LzwkXM1EH0AabTH0ZSddzJw'
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`

    const prompt = `Tu es un assistant expert en recommandation de véhicules. 

Un utilisateur souhaite réserver un véhicule avec les informations suivantes :
- Destination : ${destination}
- Description du trajet : ${description}
${startDate ? `- Date de début : ${startDate}` : ''}
${endDate ? `- Date de fin : ${endDate}` : ''}

Véhicules disponibles :
${vehiclesInfo.map((v, i) => `${i + 1}. ${v.brand} ${v.model} ${v.year} - Type: ${v.type}, Places: ${v.seats}, Kilométrage: ${v.mileage}km${v.description ? `, Description: ${v.description}` : ''}`).join('\n')}

Analyse la destination, la description du trajet et les besoins de l'utilisateur, puis recommande les 3 meilleurs véhicules adaptés en expliquant pourquoi chaque véhicule est adapté.

Réponds UNIQUEMENT avec un JSON valide au format suivant (sans markdown, sans code blocks) :
{
  "recommendations": [
    {
      "vehicleId": "id_du_vehicule",
      "reason": "Explication détaillée de pourquoi ce véhicule est adapté",
      "score": 10
    }
  ],
  "analysis": "Analyse générale du trajet et des besoins"
}`

    let geminiText = ''
    try {
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('Erreur Gemini API:', response.status, errorData)
        // Si l'API Gemini échoue, utiliser le fallback
        throw new Error('Gemini API error')
      }

      const geminiData = await response.json()
      geminiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

      if (!geminiText) {
        console.error('Réponse Gemini vide:', geminiData)
        throw new Error('Empty Gemini response')
      }
    } catch (geminiError) {
      console.error('Erreur lors de l\'appel à Gemini:', geminiError)
      // Utiliser le fallback si Gemini échoue
      geminiText = null
    }

    // Extraire le JSON de la réponse ou utiliser le fallback
    let recommendationsData
    if (!geminiText) {
      // Fallback si Gemini n'a pas répondu
      recommendationsData = {
        recommendations: availableVehicles.slice(0, 3).map((v, index) => ({
          vehicleId: v._id.toString(),
          reason: `Véhicule ${v.type} avec ${v.seats} places, adapté pour votre trajet vers ${destination}. ${v.description || 'Confortable et fiable.'}`,
          score: 9 - index
        })),
        analysis: `Pour votre trajet vers ${destination}, nous recommandons des véhicules adaptés selon la description : ${description}`
      }
    } else {
      try {
        // Nettoyer la réponse pour extraire le JSON
        const jsonMatch = geminiText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          recommendationsData = JSON.parse(jsonMatch[0])
        } else {
          throw new Error('JSON non trouvé dans la réponse')
        }
      } catch (parseError) {
        console.error('Erreur parsing JSON:', parseError)
        console.error('Réponse Gemini:', geminiText)
        // Fallback : recommander les 3 premiers véhicules disponibles
        recommendationsData = {
          recommendations: availableVehicles.slice(0, 3).map((v, index) => ({
            vehicleId: v._id.toString(),
            reason: `Véhicule ${v.type} avec ${v.seats} places, adapté pour votre trajet vers ${destination}. ${v.description || 'Confortable et fiable.'}`,
            score: 9 - index
          })),
          analysis: `Pour votre trajet vers ${destination}, nous recommandons des véhicules adaptés selon la description : ${description}`
        }
      }
    }

    // Enrichir les recommandations avec les données complètes des véhicules
    const enrichedRecommendations = recommendationsData.recommendations
      .map(rec => {
        const vehicle = availableVehicles.find(v => v._id.toString() === rec.vehicleId)
        if (!vehicle) return null
        
        return {
          vehicle: {
            _id: vehicle._id,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            type: vehicle.type,
            seats: vehicle.seats,
            mileage: vehicle.mileage,
            color: vehicle.color,
            image: vehicle.image,
            description: vehicle.description,
            licensePlate: vehicle.licensePlate
          },
          reason: rec.reason,
          score: rec.score || 8
        }
      })
      .filter(Boolean)
      .sort((a, b) => (b.score || 0) - (a.score || 0))

    return {
      success: true,
      recommendations: enrichedRecommendations,
      analysis: recommendationsData.analysis || 'Analyse du trajet effectuée',
      destination,
      description
    }
  } catch (error) {
    console.error('Erreur recommandation IA:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la génération des recommandations'
    })
  }
})
