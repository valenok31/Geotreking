export function latlng2distance(lat1, long1, lat2, long2) {
    //радиус Земли
    let R = 6372795;
    //перевод коордитат в радианы
    lat1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    long1 *= Math.PI / 180;
    long2 *= Math.PI / 180;
    //вычисление косинусов и синусов широт и разницы долгот
    let cl1 = Math.cos(lat1);
    let cl2 = Math.cos(lat2);
    let sl1 = Math.sin(lat1);
    let sl2 = Math.sin(lat2);
    let delta = long2 - long1;
    let cdelta = Math.cos(delta);
    let sdelta = Math.sin(delta);
    //вычисления длины большого круга
    let y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
    let x = sl1 * sl2 + cl1 * cl2 * cdelta;
    let ad = Math.atan2(y, x);
    let dist = Math.round(ad * R * 100) / 100; //расстояние между двумя координатами в метрах
    return dist
}