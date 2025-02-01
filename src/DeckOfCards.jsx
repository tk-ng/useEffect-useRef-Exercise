import { useState, useEffect, useRef } from "react";
import { Card } from "./Card";
import axios from "axios";
import "./DeckOfCards.css";

export const DeckOfCards = () => {
	const [cards, setCards] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const cardsRef = useRef();
	useEffect(() => {
		async function getCards() {
			const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
			cardsRef.current = res.data;
		}
		getCards();
	}, []);

	const drawCard = async () => {
		const { data } = await axios.get(`https://deckofcardsapi.com/api/deck/${cardsRef.current.deck_id}/draw/`);

		if (data.cards.length === 0) {
			alert("Error: no cards remaining!");
			return;
		}

		let angle = Math.random() * 90 - 45;
		let randomX = Math.random() * 40 - 20;
		let randomY = Math.random() * 40 - 20;
		setCards([...cards, { ...data.cards[0], angle, randomX, randomY }]);
	};

	const shuffleCard = async () => {
		setIsFetching((isFetching) => !isFetching);
		setCards([]);
		await axios.get(`https://deckofcardsapi.com/api/deck/${cardsRef.current.deck_id}/shuffle/`);
		setIsFetching((isFetching) => !isFetching);
	};

	return (
		<>
			<button onClick={drawCard}>GIMME A CARD!</button>
			<button onClick={shuffleCard} disabled={isFetching}>SHUFFLE!</button>

			<div id="card-area">
				{cards.map((c) => (
					<Card
					    key={c.code}	
                        src={c.image}
						angle={c.angle}
						randomX={c.randomX}
						randomY={c.randomY}
					/>
				))}
			</div>
		</>
	);
};
