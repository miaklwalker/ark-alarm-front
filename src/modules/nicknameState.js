function makeNickName(name) {
    let splitName = name.split(" ");
    if (splitName.length === 1) {
        return name.toLowerCase();
    } else if (splitName.length > 1) {
        return splitName.map(word => word[0].toLowerCase()).join("")
    }
}
export default function nicknameState(state) {
    let temp = {};
    temp[makeNickName(state.server)] = state;
    return temp;
}
