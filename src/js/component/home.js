import React, { useState, useEffect } from "react";
//import { Button } from "bootstrap";
//create your first component
export function Home() {
	let [listaTareas, setListaTareas] = useState([]);
	let [tarea, setTarea] = useState("");
	const [contador, setContador] = useState(0);
	useEffect(() => {
		getTareas();
	}, []);
	function getTareas() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		}; //cierra requestOptions
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/pame2394",
			requestOptions
		)
			.then(response => response.json())
			.then(result => setListaTareas(result))
			.catch(error => console.log("error", error));
	} //cierra getTareas
	const enviar = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify(listaTareas);
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/pame2394",
			requestOptions
		)
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	};
	const agregar = () => {
		if (tarea == "") {
			alert("Digite la tarea que desea ingresar");
		} else {
			setListaTareas([...listaTareas, { label: tarea, done: false }]);
			setTarea("");
		} //cierra el else
	}; //cierra agregar
	console.log(listaTareas);
	enviar();
	const eliminar = i => {
		const nuevaTarea = [...listaTareas];
		nuevaTarea.splice(i, 1);
		setListaTareas(nuevaTarea);
		setContador(contador - 1);
	};
	const eliminarTodo = () => {
		listaTareas = [];
		setListaTareas([...listaTareas, { label: "Sample Task", done: false }]);
		enviar();
		//window.location.reload(true);
		console.log(listaTareas);
	};
	return (
		<div
			className="text-center mt-5"
			style={{ background: "#F9EA8F", width: "360px", margin: "auto" }}>
			<h1>To do List ✍</h1>
			<input
				placeholder="Ingrese su tarea"
				onChange={e => setTarea(e.target.value)}
				value={tarea}></input>
			<button
				style={{
					background: "#FBB034",
					marginLeft: "0.3cm"
				}}
				onClick={agregar}>
				Agregar tarea
			</button>
			<ul className="list-group">
				{listaTareas.map((item, index) => {
					return (
						<li key={index} className="list-group-item">
							{item.label}
							<button
								className="remove"
								onClick={() => eliminar(index)}>
								X
							</button>
						</li>
					); //cierra return
				}) //cierra map
				}
			</ul>
			<button onClick={eliminarTodo}>Eliminar Todo!!!</button>
			<div>{listaTareas.length + "  Tareas por hacer"}</div>
		</div>
	);
} //cierra Export
