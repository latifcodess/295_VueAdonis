import vine from '@vinejs/vine'

const getStudentsQueryValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    sort: vine.string().in(['name', 'firstname', 'created_at']).optional(), // trier par nom, prénom ou date de création
    order: vine.string().in(['asc', 'desc']).optional(), // ordre de tri
    classGroupId: vine.number().optional(),
    search: vine.string().trim().minLength(1).optional(),
  })
)

export { getStudentsQueryValidator }