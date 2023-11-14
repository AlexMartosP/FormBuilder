import { ItemTypes } from "@/internals/types/DND";
import { Indexes } from "@/internals/types/engine";
import { forwardRef, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import Field from "./Field";
import FieldContextMenu from "../../../FieldContextMenu";
import { ContextMenu, ContextMenuTrigger } from "../../../ui/ContextMenu";
import { SomeFieldExceptColumn } from "@/internals/types/fieldTypes/fields";

const DraggableField = forwardRef(
  (
    {
      engineField,
      value,
      indexes,
      onChange,
      ...props
    }: {
      engineField: SomeFieldExceptColumn;
      value: any;
      onChange: (...args: any[]) => void;
      indexes: Indexes[string];
    },
    ref
  ) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(
      () => ({
        type: ItemTypes.Field,
        item: () => ({
          engineField: {
            ...engineField,
          },
          value: value,
          width: widthElementRef.current?.getBoundingClientRect().width,
          indexes,
        }),
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [value, indexes]
    );
    const widthElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      dragPreview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <div ref={widthElementRef}>
            <div
              ref={drag}
              role="DraggableBox"
              style={{
                opacity: isDragging ? "0.5" : "1",
              }}
            >
              <Field
                field={engineField}
                value={value}
                onChange={onChange}
                ref={ref}
                {...props}
              />
            </div>
          </div>
        </ContextMenuTrigger>
        <FieldContextMenu fieldKey={engineField.key} />
      </ContextMenu>
    );
  }
);

export default DraggableField;
