import vine from '@vinejs/vine'
const classGroupValidator = vine.compile(
  vine.object({
    name: vine.string().fixedLength(5)
  })
)
export { classGroupValidator }
