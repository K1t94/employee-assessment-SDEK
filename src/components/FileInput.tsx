import React, {ChangeEvent} from "react"
import {useInstance} from "react-ioc"
import {AlertService} from "../services"

interface IFileInputProps {
    onChange: (files: File) => void
}

export const FileInput = ({ onChange }: IFileInputProps) => {
    const alertService = useInstance(AlertService);

    const fileChange = (files: FileList): void => {
        const image: File | null = files[0];

        if (image) {
            if (image.size / 1024 / 1024 >= 1) {
                alertService.showAlert('Размер изображения не может превышать 1MB.');
                return
            }

            onChange(image)
        }
    };

    return (
        <input
            className="form-control fileUpload"
            name="image"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e: ChangeEvent<HTMLInputElement>) => fileChange(e.target.files)}
        />
    );
};

