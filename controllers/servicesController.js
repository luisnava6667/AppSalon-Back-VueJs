import Services from '../models/Services.js'
import { handleNotFoundError, validateObjectId } from '../utils/index.js'
const createServices = async (req, res) => {
  if (Object.values(req.body).includes('')) {
    const error = new Error('Todos los campos son obligatorios')
    return res.status(400).json({ msg: error.message })
  }
  try {
    const service = new Services(req.body)
    await service.save()
    res.status(201).json({
      msg: 'Servicio creado correctamente'
    })
  } catch (error) {
    console.log(error)
  }
}
const getServices = async (req, res) => {
  try {
    const services = await Services.find()
    res.json(services)
  } catch (error) {
    console.log(error)
  }
}
const getServiceById = async (req, res) => {
  const { id } = req.params
  if (validateObjectId(id, res)) return
  const service = await Services.findById(id)
  if (!service) {
    return handleNotFoundError(res, 'No existe un servicio con ese id')
  }
  res.json(service)
}
const updateService = async (req, res) => {
  const { id } = req.params
  if (validateObjectId(id, res)) return
  const service = await Services.findById(id)
  if (!service) {
    return handleNotFoundError(res, 'No existe un servicio con ese id')
  }
  service.name = req.body.name || service.name
  service.price = req.body.price || service.price
  try {
    await service.save()
    res.json({
      msg: 'Servicio actualizado correctamente'
    })
  } catch (error) {
    console.log(error)
  }
}
const deleteService = async (req, res) => {
  const { id } = req.params
  if (validateObjectId(id, res)) return
  const service = await Services.findById(id)
  if (!service) {
    return handleNotFoundError(res, 'No existe un servicio con ese id')
  }
  try {
    await service.deleteOne()
    res.json({
      msg: 'Servicio eliminado correctamente'
    })
  } catch (error) {
    console.log(error)
  }
}
export {
  createServices,
  getServices,
  getServiceById,
  updateService,
  deleteService
}
