export const load = ({ fetch, params }) => {
    const fetchCar = async () => {
      const res = await fetch('https://vda-lab.github.io/assets/vast2021_gps_coordinates.json')
      const data = await res.json()
      let data_for_slug = data//.filter((d) => { return d.car_id == params.slug})
      return data_for_slug
    }

    const fetchStops = async () => {
        const res = await fetch('https://vda-lab.github.io/assets/vast2021_carstops.json')
        const data = await res.json()
        data.forEach((d,i) => { d.id = i })
        let data_for_slug = data.filter((d) => { return d.car == params.slug})
        return data_for_slug
    }

    const fecthCarIds = async () => {
        const res = await fetch('https://vda-lab.github.io/assets/vast2021_gps_coordinates.json')
        const data = await res.json()
        let car_ids = data.map((d) => d.car_id)
        return [ ... new Set(car_ids)]
    }
  
    return {
      gps: fetchCar(),
      stops: fetchStops(),
      car_ids: fecthCarIds(),
      car_id: params.slug
    }
}