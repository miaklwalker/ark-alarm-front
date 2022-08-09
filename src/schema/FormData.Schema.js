import Joi from "joi";

const formClusterData = Joi.object({
    server: Joi.string().min(3).max(55).required(),
    ip: Joi.string().ip({version: ['ipv4', 'ipv6']}).required(),
    game: Joi.string().required(),
    maps: Joi.array(),
    tribemates: Joi.array().items(Joi.string()),
    enemies: Joi.array().items(Joi.string()),
    mapName: Joi.string(),
    port: Joi.number(),
    tribemate: Joi.string(),
    enemy: Joi.string()
})
 const formDataSchema = Joi.object().pattern(Joi.string(), formClusterData);
export default formDataSchema;
