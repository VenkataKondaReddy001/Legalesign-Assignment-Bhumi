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
        let eid = []
        listEmployeeIds().then(x => x.forEach((ech) => { 
            getEmployeeById(ech).then(x => {data.push(x);setAscendingEmployees(data)})
         } ))
        let uniqueIds = getUniqIds()
        console.log(uniqueIds, eid, data)
        uniqueIds.forEach((ech) => { 
            console.log(getEmployeeById(ech).then(x => console.log(x)))
         } )
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
        return data.sort((a, b) => (a['name']).localeCompare(b['name']))
    }

    return (
        <>
        {orderByAsc(ascendingEmployees).map((ech) => {
            return (
                <>
                <h1>{ech['id']}</h1>
                <h1>{ech['name']}</h1>
                </>
            )
        })

        }
        </>
    )
}

export default Employee