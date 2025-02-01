import { useState, useEffect, useRef } from "react";
import { Card } from "./Card";
import axios from "axios";

export const DeckOfCards = () => {
	const [cards, setCards] = useState([]);
	const cardsRef = useRef();
	useEffect(() => {
		async function getCards() {
			const res = await axios.get(
				"https://deckofcardsapi.com/api/deck/new/shuffle/"
			);
			cardsRef.current = res.data;
		}
		getCards();
	}, []);

	const drawCard = async () => {
		const { data } = await axios.get(
			`https://deckofcardsapi.com/api/deck/${cardsRef.current.deck_id}/draw/`
		);

		if (data.cards.length === 0) {
			alert("Error: no cards remaining!");
			return;
		}

		let angle = Math.random() * 90 - 45;
		let randomX = Math.random() * 40 - 20;
		let randomY = Math.random() * 40 - 20;
		setCards([...cards, { ...data.cards[0], angle, randomX, randomY }]);
	};

	return (
		<>
			<button onClick={drawCard}>GIMME A CARD!</button>
			<div id="card-area">
				{cards.map((c) => (
					<Card
						src={c.image}
						key={c.code}
						angle={c.angle}
						randomX={c.randomX}
						randomY={c.randomY}
					/>
				))}
			</div>
		</>
	);
};
