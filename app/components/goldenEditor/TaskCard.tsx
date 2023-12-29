import {
  NotionTask,
  onFavoriteAdd,
  onFavoriteRemove,
  onFavoriteUpdate,
} from "@/type";
import { useEffect, useRef, useState } from "react";
import GoldenRate from "@/public/assets/layout/RatingGold.svg";
import Rate from "@/public/assets/layout/Rating.svg";
import DragIcon from "@/public/assets/layout/dragIcon.svg";
import { trpc } from "@/utils/trpc";
import { useDebouncedCallback } from "use-debounce";
import TextareaAutosize from "react-textarea-autosize";
import { toast, ToastContainer } from "react-toastify";

export const TaskCard = ({
  data,
  notionId,
  onFavoriteAdd,
  onFavoriteRemove,
  onTaskRemoved,
  onFavoriteUpdate,
}: {
  data: NotionTask;
  notionId: string;
  onFavoriteAdd: onFavoriteAdd;
  onFavoriteRemove: onFavoriteRemove;
  onFavoriteUpdate: onFavoriteUpdate;
  onTaskRemoved: (task_id: string) => void;
}) => {
  const [task, setTask] = useState<NotionTask>({ ...data });
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(task.value);
  const [isSubTask, setIsSubTask] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: updateCheckStatus, isLoading: isCheckedLoading } =
    trpc.updateTaskChecked.useMutation();
  const { mutate: updateFavoriteStatus, isLoading: isFavoriteLoading } =
    trpc.updateFavoriteStatus.useMutation();
  const { mutate: updateTaskValue } = trpc.updateTaskValue.useMutation();
  const { mutate: deleteTask } = trpc.deleteTask.useMutation();

  const updateTaskValueDebounced = useDebouncedCallback(
    ({
      notion_id,
      value,
      task_id,
    }: {
      notion_id: string;
      value: string;
      task_id: string;
    }) => {
      updateTaskValue(
        {
          notion_id,
          value,
          task_id,
        },
        {
          onSuccess: () => {
            if (!task.isFavorite) return;
            onFavoriteUpdate({
              taskId: task.id,
              value,
            });
          },
        }
      );
    },
    500
  );

  const onMouseEnterHandler = () => setVisible(true);
  const onMouseLeaveHandler = () => setVisible(false);

  const onCheckboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCheckedLoading) return;
    const status = e.target.checked;
    updateCheckStatus(
      {
        notion_id: notionId,
        task_id: task.id,
        status,
      },
      {
        onSuccess: () => {
          setTask((prev) => {
            return {
              ...prev,
              checked: status,
            };
          });
        },
      }
    );
  };

  const onFavoriteStatusHandler = () => {
    if (isFavoriteLoading) return;

    const status = !task.isFavorite;

    updateFavoriteStatus(
      {
        notion_id: notionId,
        task_id: task.id,
        status,
      },
      {
        onSuccess: () => {
          setTask((prev) => {
            return {
              ...prev,
              isFavorite: status,
            };
          });

          const value = textAreaRef.current!.value;

          if (status) {
            onFavoriteAdd({
              value,
              taskId: task.id,
              notionId: notionId,
            });
          } else {
            onFavoriteRemove({ taskId: task.id });
          }
        },

        onError: (err) => {
          toast.error(
            "Cannot add more than 6 priorities, try removing some of them first."
          );
        },
      }
    );
  };

  const onValueChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value === "") {
      deleteTask(
        {
          notion_id: notionId,
          task_id: task.id,
        },
        {
          onSuccess: () => {
            onTaskRemoved(task.id);
            onFavoriteRemove({ taskId: task.id });
          },
        }
      );
      return;
    }

    setValue(value);
    updateTaskValueDebounced({
      notion_id: notionId,
      task_id: task.id,
      value,
    });
  };

  return (
    <div
      className={`flex flex-1  ${task.subTask ? "pl-[22px]" : null} `}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className={`${visible ? "md:visible" : "invisible"} mr-[10px]`}>
        <DragIcon />
      </div>

      <label className={` mr-4 containerCheckbox cursor-pointer `}>
        <input
          checked={task.checked}
          type="checkbox"
          onChange={onCheckboxChangeHandler}
        />{" "}
        <span className={` checkmark `}></span>
      </label>

      <TextareaAutosize
        ref={textAreaRef}
        className={`
                scroll-bar 
                placeholder-placeholder bg-transparent  outline-none text-[14px] w-[90%]
                ${task.isFavorite ? "text-gold" : null}
                ${
                  task.checked
                    ? "line-through placeholder-editor text-editor "
                    : null
                }
                
            `}
        style={{ resize: "none", whiteSpace: "pre-wrap" }}
        onChange={onValueChangeHandler}
        value={value}
      />

      <div
        className={`${visible ? "visible" : "invisible"}`}
        onClick={onFavoriteStatusHandler}
      >
        <div className="cursor-pointer">
          {task.isFavorite ? <GoldenRate /> : <Rate />}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
