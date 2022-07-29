import Joi from "joi";

const userDataSchema = Joi.object({
    server: Joi.string().min(3).max(55).required(),
    ip: Joi.string().ip({version: ['ipv4', 'ipv6']}).required(),
    game: Joi.string().required(),
    maps: Joi.object(),
    tribemates: Joi.array().items(Joi.string()),
    enemies: Joi.array().items(Joi.string())
});

export default function formToFirebaseAdapter(formData) {
    if (!formData) return;
    if (Object.keys(formData).length === 0) return;
    try {
        const {ip, server, game, maps, enemies, tribemates} = formData;
        const mapConversion = {}
        if (maps) {
            maps.forEach(({mapName, port}) => {
                mapConversion[mapName] = port
            })
        }
        let firebaseData = {
            ip,
            server,
            game,
            maps: mapConversion,
            enemies,
            tribemates
        }
        Joi.assert(firebaseData, userDataSchema)
        return firebaseData;
    } catch (err) {
        return err
    }
}
