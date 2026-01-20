import mongoose from 'mongoose'

const VehicleSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'La marque est requise'],
      trim: true
    },
    model: {
      type: String,
      required: [true, 'Le modèle est requis'],
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'L\'année est requise'],
      min: [1900, 'Année invalide'],
      max: [new Date().getFullYear() + 1, 'Année invalide']
    },
    licensePlate: {
      type: String,
      required: [true, 'La plaque d\'immatriculation est requise'],
      unique: true,
      trim: true,
      uppercase: true
    },
    color: {
      type: String,
      trim: true,
      default: 'Non spécifié'
    },
    type: {
      type: String,
      enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Pickup', 'Van'],
      required: [true, 'Le type de véhicule est requis']
    },
    seats: {
      type: Number,
      required: [true, 'Le nombre de places est requis'],
      min: [1, 'Le nombre de places doit être au moins 1']
    },
    mileage: {
      type: Number,
      default: 0,
      min: [0, 'Le kilométrage ne peut pas être négatif']
    },
    status: {
      type: String,
      enum: ['available', 'maintenance', 'reserved'],
      default: 'available'
    },
    image: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

VehicleSchema.index({ licensePlate: 1 })
VehicleSchema.index({ status: 1 })

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema)
