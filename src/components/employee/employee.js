import { data } from "autoprefixer";

const { useState, useEffect } = require("react");

const Employee = () => {

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
        alphaOrder()
        getUniqIds()
    }, [])

    const alphaOrder = () => {
        let data = []
        getUniqIds().then(x => x.forEach((ech) => { 
            getEmployeeById(ech).then(x => {data.push(x);setAscendingEmployees(data)})
         } ))
    }

    const getUniqIds = async () => {
        let eids = []
        await listEmployeeIds().then(x => { eids = x; } )
        eids = eids.filter(function(item, pos) {
            return eids.indexOf(item) == pos;
        })
        return eids
    }

    const orderByAsc = (data) => {
        const filteredArr = data.sort((a, b) => (a['name']).localeCompare(b['name']));
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