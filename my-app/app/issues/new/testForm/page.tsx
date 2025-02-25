'use client';
import { useForm } from "react-hook-form";

type formInput = {
    name: string;
    country: string;
};

const FormComponent = () => {
    const { register, handleSubmit } = useForm<formInput>();
    return (
        <form className="space-y-5" onSubmit={handleSubmit((data) => console.log(data))}>
            <input type="text" placeholder="Your Name" {...register("name")} />
            <input type="text" placeholder="Your Country" {...register("country")} />
            <br />
            <button>Submit</button>
        </form>
    );
};

// exemple du log { name: "Mehdi", country: "Belgique" }

export default FormComponent;
