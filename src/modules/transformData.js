export default function transformData(data){
    let newData = {};
    newData["Discord Server"] = data.name;
    newData["Configs"] = data.data;
    return newData;
}
