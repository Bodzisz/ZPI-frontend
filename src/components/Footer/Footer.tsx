import { Anchor, Group, Container, Image } from "@mantine/core";
import "./Footer.css";
import logo from "../../img/logo.png";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const links = [
  { link: "#", label: "ZPI" },
  { link: "#", label: "K.Wójcicki" },
  { link: "#", label: "H.Budny" },
  { link: "#", label: "J.Stankiewicz" },
  { link: "#", label: "F.Brzeziak" },
];

export function FooterCentered() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className="footer" style={{ width: mobile ? "100vw" : "auto" }}>
      <Container className="inner">
        <Image src={logo} h={40} w={40} />
        <Group className="links">{items}</Group>
      </Container>
    </div>
  );
}
