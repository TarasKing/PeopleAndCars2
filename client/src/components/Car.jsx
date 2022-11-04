

export default function CarComponent (car, person, deleteCar, updateCar) { 

    return (
        <div className="car" key={car.id}>
        <div className="car-name">{car.year} {car.make} {car.model}</div>
            <div className="car-price">{car.price}</div>
            <div> {person.firstName} {person.lastName}</div>
            <button onClick={()=>updateCar()}>Edit car</button>
            <button onClick={()=>deleteCar()}>remove car</button>
        </div>
    )
}
