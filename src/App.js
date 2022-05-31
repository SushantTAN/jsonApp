import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({});

  const [list, setList] = useState([]);

  const handleSubmit = async (event) => {
    try {

      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name: formData.name,
          username: formData.status,
          email: formData.image,
          phone: formData.capacity,
          website: formData.layout,
        })
      });

      const responseJson = await response.json();
      console.log(responseJson);

      setList([...list, responseJson]);


    } catch (e) {
      console.log("Error:", e);
    }
  }

  const handleCancel = () => {
    fetchData();
  }

  const handleChange = (event) => {
    console.log(formData)
    setFormData({ ...formData, [event.target.id]: event.target.value })

    if (event.target.id === 'status')
      setFormData({ ...formData, status: event.target.checked })
  }

  const handleDelete = async (id) => {
    try {

      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });

      const responseJson = await response.json();

      setList(list.filter(el => el.id !== id));

    } catch (e) {
      console.log("Error:", e);
    }
  }

  const fetchData = async () => {
    try {

      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const responseJson = await response.json();

      // console.log(responseJson);
      setList(responseJson);

    } catch (e) {
      console.log("Error:", e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="heading">Create Table</div>
      <div className="center">
        <form className="column">

          {/* <div> */}
          <label>Layout: </label>
          <select name="layout" id="layout" onChange={handleChange} className="field" placeholder="Select Layout">
            <option value="" disabled selected>Select Layout</option>
            <option value="layout1">Layout 1</option>
            <option value="layout2">Layout 2</option>
            <option value="layout3">Layout 3</option>
            <option value="layout4">Layout 4</option>
          </select>
          {/* </div> */}

          {/* <div> */}
          <label>Name: </label>
          <input className="field" type="text" placeholder="Enter Name" id="name" onChange={handleChange} />
          {/* </div> */}

          {/* <div> */}
          <label>Capacity: </label>
          <input className="field" type="number" placeholder="Enter number of capacity" id="capacity" onChange={handleChange} />
          {/* </div> */}

          {/* <div> */}
          <label>Status: </label>
          <input type="checkbox" className="field" id="status" name="status" value="status" onChange={handleChange} />
          {/* </div> */}

          {/* <div> */}
          <label>Image: </label>
          <input className="file" type="file" id="image" name="image" onChange={handleChange} />
          {/* </div> */}


        </form>

        <div className="column buttoncontainer">
          <div></div>
          <div>
            <button onClick={handleSubmit} className="buttonBlue">Create Table</button>
            <button onClick={handleCancel} className="buttonRed">Cancel</button>
          </div>
        </div>
      </div>




      <div className="center">
        <table>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Capacity</th>
            <th>Image</th>
            <th>Layout</th>
            <th>Actions</th>
          </tr>
          {
            list.map((item, index) => <tr>
              <td>{item.name}</td>
              <td>{item.username ? "true" : "false"}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.website}</td>

              {/* <button className="buttonBlue">Edit</button> */}
              <button className="buttonRed" onClick={() => handleDelete(item.id)}>delete</button>
            </tr>)
          }
        </table>
      </div>
    </div>
  );
}

export default App;
