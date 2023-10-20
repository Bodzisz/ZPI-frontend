import { Anchor, Group, Container } from '@mantine/core';
import './Footer.css';

const links = [
  { link: '#', label: 'Zgłoś awarię' },
  { link: '#', label: 'Zgłoś nadużycie' },
  { link: '#', label: 'Kontakt' },
  { link: '#', label: 'O autorach' },
  { link: '#', label: 'Coś więcej nw' },
];

export function FooterCentered() {
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
    <div className="footer" >
      <Container className="inner">
        LOGO
        <Group className="links">{items}</Group>
      </Container>
    </div>
  );
}