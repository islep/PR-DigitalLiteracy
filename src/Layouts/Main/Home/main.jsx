import HomeCard from '../../../components/homeCard';
import features from '../../../features';

const HomeMain = () => (
	<div className="w-full flex items-center justify-center pb-36">
		<div className="flex flex-wrap justify-center items-stretch gap-4 md:gap-16 max-w-screen-xl">
			{features.map((card, i) => (
				<HomeCard
					href={card.href}
					key={card.heading}
					index={i}
					image={card.image}
					heading={card.heading}
					subItems={card.subItems}
				/>
			))}
		</div>
	</div>
);

export default HomeMain;
