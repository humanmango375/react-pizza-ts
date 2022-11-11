import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface PizzaData {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizzaData, setPizzaData] = React.useState<PizzaData>({} as PizzaData);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`https://62f4e313535c0c50e764a03d.mockapi.io/pizzas/${id}`);
        setPizzaData(res.data);
      } catch (err) {
        navigate('/');
      }
    };
    fetchData();
  }, [id]);

  if (!Object.keys(pizzaData).length) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <div>
      <img src={pizzaData.imageUrl} alt="" />
      <h2>{pizzaData.name}</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, quaerat. Ratione possimus
        nihil, vel consequuntur saepe doloribus quos ullam eum distinctio quas mollitia inventore
        nulla, quidem deleniti. Quisquam, in dicta.
      </p>
      <h4>{pizzaData.price}р.</h4>
    </div>
  );
};

export default FullPizza;
