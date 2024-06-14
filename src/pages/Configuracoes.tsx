import { useState, MouseEvent, ChangeEvent, useEffect } from "react";
import { useAppThemeContext } from "../shared/contexts";
import { Box, Typography, Paper, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { LayoutMasterPage } from "../shared/layouts";
import ChangePassword from "../shared/components/Configuracoes/ChangePassword";
import ChangeAvatar from "../shared/components/Configuracoes/ChangeAvatar";

export const Configuracoes = () => {
  const [height, setHeight] = useState(0);
  const [, setFile] = useState<File | any>(null);
  const [, setFileLoaded] = useState<boolean>(false);
  const { toggleTheme } = useAppThemeContext();
  const [alignment, setAlignment] = useState("web");

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    toggleTheme();
  };

  const handleAvatarUploaded = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileLoaded(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setHeight(document.body.clientHeight); // Define a altura 0.8 da altura da janela
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Define a altura ao montar o componente

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <LayoutMasterPage titulo="Configurações" height={height}>
      <Box
        height="100%"
        width="100%"
        display="flex"
        margin={0}
        flexDirection="column"
        bgcolor="#00F12F"
      >
        <Box
          gap={1}
          margin={1}
          padding={1}
          paddingX={2}
          height="auto"
          display="flex"
          flexDirection="column"
          alignItems="start"
          component={Paper}
        >
          <Typography variant="h6">Tema</Typography>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="light">Claro</ToggleButton>
            <ToggleButton value="dark">Escuro</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <ChangePassword />
        <ChangeAvatar handleAvatarUploaded={handleAvatarUploaded} />
      </Box>
    </LayoutMasterPage>
  );
};
