import { createElement, ReactElement } from "react";
import DragCard from "./DragCard";
import { DragListProps, ListOfSortableItemsType } from "./types";

function Column({ listOfSortableItems, content, reorderAfterDrop, emptyData }: DragListProps): ReactElement {
    return (
        <div className="app">
            {listOfSortableItems.length ? (
                listOfSortableItems.map((fullItem: ListOfSortableItemsType, index: number) => {
                    return (
                        <DragCard
                            key={index}
                            item={fullItem}
                            index={index}
                            reorderAfterDrop={reorderAfterDrop}
                            listOfSortableItems={listOfSortableItems}
                        >
                            {content && content(fullItem.item)}
                        </DragCard>
                    );
                })
            ) : (
                <DragCard reorderAfterDrop={reorderAfterDrop} item={undefined} index={0}>
                    <div className={"drag-and-drop__empty-list"}>{emptyData}</div>
                </DragCard>
            )}
        </div>
    );
}

export default Column;
