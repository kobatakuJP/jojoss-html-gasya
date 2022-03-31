export const isJpnAprilFool = () => {
    const nowjst = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    return nowjst.getMonth() === 3 && nowjst.getDate() === 1
}