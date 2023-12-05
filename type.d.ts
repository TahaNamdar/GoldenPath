// globals

export type Notion = { title: string; id: string; Tasks: NotionTask[]; userId: string; index: number };
export type NotionTask = { id: string; value: string; isFavorite: boolean; subTask: boolean; checked: boolean; visible: boolean };
export type Priority = {
    id: string;
    notionId: string;
    taskId: string;
    value: string;
    userId: string;
    index: number;
};

type onFavoriteAddArgument = {
    value: string;
    notionId: string;
    taskId: string;
};
type onFavoriteRemoveArgument = {
    taskId: string;
};
type onFavoriteUpdateArgument = {
    taskId: string;
    value: string;
};

export type onFavoriteAdd = ({ value, notion_id, task_id }: onFavoriteAddArgument) => void;
export type onFavoriteRemove = ({ taskId }: onFavoriteRemoveArgument) => void;
export type onFavoriteUpdate = ({ taskId, value }: onFavoriteUpdateArgument) => void;
