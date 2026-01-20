import User from '~/server/models/User.js'
import Vehicle from '~/server/models/Vehicle.js'
import { adminMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    await adminMiddleware(event)

    await User.deleteMany({})
    await Vehicle.deleteMany({})

    // Vérifier si l'admin existe déjà
    let admin = await User.findOne({ email: 'admin@carlab.com' })
    if (!admin) {
      admin = new User({
        email: 'admin@carlab.com',
        password: '12345678',
        firstName: 'Admin',
        lastName: 'System',
        role: 'admin'
      })
      await admin.save()
    } else {
      // Mettre à jour le mot de passe si l'admin existe déjà
      admin.password = '12345678'
      admin.role = 'admin'
      await admin.save()
    }

    const user = new User({
      email: 'user@carlab.com',
      password: 'user123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user'
    })
    await user.save()

    const vehicles = [
      {
        brand: 'Chevrolet',
        model: 'Trax',
        year: 2025,
        licensePlate: 'ABC-123',
        color: 'Gris',
        type: 'SUV',
        seats: 5,
        mileage: 560,
        status: 'available',
        description: 'Véhicule compact et économique'
      },
      {
        brand: 'Chevrolet',
        model: 'Equinox',
        year: 2025,
        licensePlate: 'DEF-456',
        color: 'Gris',
        type: 'SUV',
        seats: 5,
        mileage: 897,
        status: 'available',
        description: 'SUV spacieux et confortable'
      },
      {
        brand: 'Tesla',
        model: 'Model Y',
        year: 2025,
        licensePlate: 'GHI-789',
        color: 'Bleu',
        type: 'SUV',
        seats: 7,
        mileage: 720,
        status: 'available',
        description: 'Véhicule électrique premium'
      },
      {
        brand: 'BMW',
        model: 'X5',
        year: 2024,
        licensePlate: 'JKL-012',
        color: 'Gris',
        type: 'SUV',
        seats: 5,
        mileage: 850,
        status: 'available',
        description: 'Luxury SUV avec toutes les options'
      },
      {
        brand: 'Toyota',
        model: 'Camry',
        year: 2024,
        licensePlate: 'MNO-345',
        color: 'Noir',
        type: 'Sedan',
        seats: 5,
        mileage: 1200,
        status: 'available',
        description: 'Sedan fiable et économique'
      },
      {
        brand: 'Honda',
        model: 'Civic',
        year: 2024,
        licensePlate: 'PQR-678',
        color: 'Rouge',
        type: 'Sedan',
        seats: 5,
        mileage: 950,
        status: 'available',
        description: 'Compact sportif'
      },
      {
        brand: 'Ford',
        model: 'F-150',
        year: 2024,
        licensePlate: 'STU-901',
        color: 'Argent',
        type: 'Pickup',
        seats: 3,
        mileage: 1500,
        status: 'available',
        description: 'Pickup robuste et polyvalent'
      },
      {
        brand: 'Mercedes',
        model: 'Sprinter',
        year: 2023,
        licensePlate: 'VWX-234',
        color: 'Blanc',
        type: 'Van',
        seats: 12,
        mileage: 2000,
        status: 'available',
        description: 'Van pour transport de groupe'
      }
    ]

    for (const vehicleData of vehicles) {
      const vehicle = new Vehicle(vehicleData)
      await vehicle.save()
    }

    return {
      success: true,
      message: 'Base de données initialisée avec succès',
      data: {
        users: 2,
        vehicles: vehicles.length
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Erreur lors de l\'initialisation'
    })
  }
})
