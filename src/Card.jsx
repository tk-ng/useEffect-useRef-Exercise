import PropTypes from "prop-types";

export const Card = ({ src, randomX, randomY, angle }) => {
	return (
		<img
			src={src}
			style={{
				transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
			}}
		/>
	);
};

Card.propTypes = {
	src: PropTypes.string,
	randomX: PropTypes.number,
	randomY: PropTypes.number,
	angle: PropTypes.number,
};
