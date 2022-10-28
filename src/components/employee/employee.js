import { data } from "autoprefixer";

const { useState, useEffect } = require("react");

const Employee = () => {

    const [eid, setEid] = useState([])
    const [ascendingEmployees, setAscendingEmployees] = useState([])

    const listEmployeeIds = async () => {
        return [2, 3, 5, 2, 7, 5];
    };

    const getEmployeeById = async (id) => {
        let employees = [
            { id: 2, name: "Rory" },
            { id: 3, name: "Ben" },
            { id: 5, name: "Alex" },
            { id: 7, name: "Angel" }
        ];
        return employees.find((e) => e.id === id);
    };

    useEffect(() => {
        listEmployeeIds().then(x => setEid(x))
        alphaOrder()
    }, [])

    const alphaOrder = () => {
        let data = []
        listEmployeeIds().then(x => x.forEach((ech) => { 
            getEmployeeById(ech).then(x => {console.log(x,data);data.push(x);setAscendingEmployees(data)})
         } ))
    }

    const getUniqIds = () => {
        let data = []
        listEmployeeIds().then(x => { data.push(x) } )
        let uniqueIds = data.filter(function(item, pos) {
            return data.indexOf(item) == pos;
        })
        return uniqueIds
    }

    const orderByAsc = (data) => {
        const filteredArr = data.reduce((acc, current) => {const x = acc.find(item => item.id === current.id);if (!x) {return acc.concat([current]);} else {return acc;}}, []).sort((a, b) => (a['name']).localeCompare(b['name']));
        return filteredArr
    }

    return (
        <>
        {orderByAsc(ascendingEmployees).map((ech, index) => {
            return (
                <div key={index}>
                <h1>{ech['id']}</h1>
                <h1>{ech['name']}</h1>
                </div>
            )
        })

        }
        </>
    )
}

export default Employee