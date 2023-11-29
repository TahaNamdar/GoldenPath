import { useState } from "react";
interface Input {
    id: number;
    value: string;
    title: string;
    checked: boolean;
    isFavorite: boolean;
}

export const useCustomHook = () => {
    const [inputs, setInputs] = useState<Input[]>([{ id: Date.now(), value: "", title: "", checked: false, isFavorite: false }]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setFocusOnTitle(true);
        setInputs((prevInputs) => {
            return prevInputs.map((input) => {
                return {
                    ...input,
                    title: e.target.value,
                };
            });
        });
    };

    const handleKeyDown = (e: any, ID: number) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent the default behavior (submitting the form)
            const currentInput = inputs.find((input: any) => input.id === ID);
            // setBackSpace(false);
            // setFocusOnTitle(false);
            if (currentInput?.value.trim() !== "") {
                const newInput = {
                    id: Date.now(),
                    value: "",
                    title: "",
                    checked: false,
                    isFavorite: false,
                };
                setInputs([...inputs, newInput]);
            }
        }
        if (e.key === "Backspace" && e.target.value == "") {
            const filteredArray = inputs.filter((item: any, _) => item.id !== ID);
            setInputs(filteredArray);
        }
        if (e.key === "Backspace") {
            // setBackSpace(true);
        }
    };

    const handleChecked = (id: number) => {
        setInputs((prevInputs) => {
            return prevInputs.map((input) => {
                if (input.id === id) {
                    return {
                        ...input,
                        checked: !input.checked,
                    };
                }
                return input;
            });
        });
    };

    const favoriteHandler = (id: number) => {
        setInputs((prevInputs) => {
            return prevInputs.map((input) => {
                if (input.id === id) {
                    return {
                        ...input,
                        isFavorite: !input.isFavorite,
                    };
                }
                return input;
            });
        });
    };

    const handleDragDrop = (results: any) => {
        const { source, destination, type } = results;

        if (!destination) return;
        if (source.draggableId === destination.droppableId && source.index === destination.index) return;

        if (type === "group") {
            const reorderedStores = [...inputs];

            const sourceIndex = source.index;
            const destinationIndex = destination.index;

            const [removedStore] = reorderedStores.splice(sourceIndex, 1);
            reorderedStores.splice(destinationIndex, 0, removedStore);

            return setInputs(reorderedStores);
        }
    };

    return {
        inputs,
        handleInputChange,
        handleChecked,
        favoriteHandler,
        handleKeyDown,
        handleDragDrop,
        setInputs,
    };
};
