import React, { useEffect, useState } from 'react';
import ChonkyFileBrowser from 'chonky/es/components/ChonkyFileBrowser';
import ChonkyIconFA from 'chonky-icon-fontawesome';

const FileTree = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Fetch file tree data from the backend API
        const fetchFileTree = async () => {
            try {
                const response = await fetch(`${window.env.API_ENDPOINT}/files/`);
                const data = await response.json();
                setFiles(data);
            } catch (error) {
                console.error('Error fetching file tree:', error);
            }
        };

        fetchFileTree();
    }, []);

    return (
        <ChonkyFileBrowser
            files={files}
            iconComponent={ChonkyIconFA}
            enableDownload={true}
            onFileAction={handleFileAction}
        />
    );
};

const handleFileAction = (file, action) => {
    if (action.id === 'open_file') {
        window.open(`${window.env.API_ENDPOINT}/download/${file.id}`);
    }
};

export default FileTree;
