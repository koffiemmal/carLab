import mongoose from 'mongoose'

const ReservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'L\'utilisateur est requis']
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Le véhicule est requis']
    },
    startDate: {
      type: Date,
      required: [true, 'La date de début est requise']
    },
    endDate: {
      type: Date,
      required: [true, 'La date de fin est requise']
    },
    startTime: {
      type: String,
      required: [true, 'L\'heure de début est requise'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide (HH:MM)']
    },
    endTime: {
      type: String,
      required: [true, 'L\'heure de fin est requise'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide (HH:MM)']
    },
    pickupLocation: {
      type: String,
      trim: true,
      default: ''
    },
    dropoffLocation: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
      default: 'pending'
    },
    purpose: {
      type: String,
      trim: true,
      default: ''
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

ReservationSchema.index({ vehicle: 1, startDate: 1, endDate: 1 })
ReservationSchema.index({ user: 1 })
ReservationSchema.index({ status: 1 })

ReservationSchema.pre('save', function (next) {
  if (this.startDate >= this.endDate) {
    return next(new Error('La date de début doit être antérieure à la date de fin'))
  }
  
  const now = new Date()
  if (this.startDate < now.setHours(0, 0, 0, 0)) {
    return next(new Error('La date de début ne peut pas être dans le passé'))
  }
  
  next()
})

ReservationSchema.methods.checkOverlap = async function () {
  const Reservation = mongoose.model('Reservation')
  
  const overlapping = await Reservation.find({
    vehicle: this.vehicle,
    _id: { $ne: this._id },
    status: { $in: ['pending', 'confirmed', 'active'] },
    $or: [
      {
        startDate: { $lte: this.startDate },
        endDate: { $gte: this.startDate }
      },
      {
        startDate: { $lte: this.endDate },
        endDate: { $gte: this.endDate }
      },
      {
        startDate: { $gte: this.startDate },
        endDate: { $lte: this.endDate }
      }
    ]
  })
  
  return overlapping.length > 0
}

export default mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema)
