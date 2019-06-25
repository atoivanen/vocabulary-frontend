const chapters = [
  {
    id: 1,
    title: 'Le Petit Chaperon Rouge',
    body: 'Il était une fois une petite fille de village, la plus jolie qu\'on eût su voir: sa mère en était folle, et sa mère-grand plus folle encore. Cette bonne femme lui fit faire un petit chaperon rouge qui lui seyait si bien, que partout on l\'appelait le Petit Chaperon Rouge.\n\nUn jour, sa mère ayant fait et cuit des galettes, lui dit:\n\n--Va voir comment se porte ta mère-grand; car on m\'a dit qu\'elle était malade. Porte-lui une galette et ce petit pot de beurre.\n\nLe Petit Chaperon Rouge partit aussitôt pour aller chez sa mère-grand, qui demeurait dans un autre village. En passant dans un bois, elle rencontra compère le Loup, qui eut bien envie de la manger; mais il n\'osa, à cause de quelques bûcherons qui étaient dans la forêt. Il lui demanda où elle allait. La pauvre enfant, qui ne savait pas qu\'il était dangereux de s\'arrêter à écouter un Loup, lui dit:\n\n--Je vais voir ma mère-grand, et lui porter une galette avec un pot de beurre, que ma mère lui envoie.\n\n--Demeure-t-elle bien loin? lui dit le Loup.\n\n--Oh! oui, lui dit le Petit Chaperon Rouge; c\'est par delà le moulin que vous voyez tout là-bas, là-bas, à la première maison du village.\n\n--Eh bien, dit le Loup, je veux l\'aller voir aussi; je m\'y en vais par ce chemin-ci et toi par ce chemin-là, et nous verrons à qui plus tôt y sera.\n\nLe Loup se mit à courir de toute sa force par le chemin qui était le plus court, et la petite fille s\'en alla par le chemin le plus long, s\'amusant à cueillir des noisettes, à courir après des papillons, et à faire des bouquets de petites fleurs qu\'elle rencontrait. Le Loup ne fut pas longtemps à arriver à la maison de la mère-grand; il heurte.\n\n--Toc, toc.\n\n--Qui est là?\n\n--C\'est votre fille le Petit Chaperon Rouge, dit le Loup en contrefaisant sa voix, qui vous apporte une galette et un petit pot de beurre, que ma mère vous envoie.\n\nLa bonne mère-grand, qui était dans son lit, à cause qu\'elle se trouvait un peu mal, lui cria:\n\n--Tire la chevillette, la bobinette cherra.\n\nLe Loup tira la chevillette, et la porte s\'ouvrit. Il se jeta sur la bonne femme, et la dévora en moins de rien; car il y avait plus de trois jours qu\'il n\'avait mangé.\n\nEnsuite, il ferma la porte, et s\'alla coucher dans le lit de la mère-grand, en attendant le Petit Chaperon Rouge, qui, quelque temps après, vint heurter à la porte.\n\n--Toc, toc.\n\n--Qui est là?\n\nLe Petit Chaperon Rouge, qui entendit la grosse voix du Loup, eut peur d\'abord; mais, croyant que sa mère-grand était enrhumée, il répondit:\n\n--C\'est votre fille, le Petit Chaperon Rouge, qui vous apporte une galette et un petit pot de beurre, que ma mère vous envoie.\n\nLe Loup lui cria, en adoucissant un peu sa voix:\n\n--Tire la chevillette, la bobinette cherra.\n\nLe Petit Chaperon Rouge tira la chevillette, et la porte s\'ouvrit. Le Loup, la voyant entrer, lui dit, en se cachant dans le lit, sous la couverture:\n\n--Mets la galette et le petit pot de beurre sur la huche, et viens te coucher avec moi.\n\nLe Petit Chaperon se déshabille, et va se mettre dans le lit, où elle fut bien étonnée de voir comment sa mère-grand était faite en son déshabillé. Elle lui dit:\n\n--Ma mère-grand, que vous avez de grands bras!\n\n--C\'est pour mieux t\'embrasser, ma fille.\n\n--Ma mère-grand, que vous avez de grands pieds!\n\n--C\'est pour mieux courir, mon enfant.\n\n--Ma mère-grand, que vous avez de grandes oreilles!\n\n--C\'est pour mieux écouter, mon enfant.\n\n--Ma mère-grand, que vous avez de grands yeux!\n\n--C\'est pour mieux voir, mon enfant.\n\n--Ma mère-grand, que vous avez de grandes dents!\n\n--C\'est pour te manger.\n\nEt, en disant ces mots, le méchant Loup se jeta sur le Petit Chaperon Rouge, et la mangea.\n\nMORALITÉ.\nOn voit ici que les jeunes enfants,\nSurtout de jeunes filles\nBelles, bien faites et gentilles,\nFont très-mal d\'écouter toutes sortes de gens\nEt que ce n\'est pas chose étrange\nS\'il en est tant que le loup mange.\nJe dis le loup, car tous les loups\nNe sont pas de la même sorte.\nIl en est d\'une humeur accorte,\nSans bruit, sans fiel et sans courroux,\nQui, privés, complaisants et doux,\nSuivent les jeunes demoiselles\nJusque dans les maisons, jusque dans les ruelles.\nMais, hélas! qui ne sait que ces loups doucereux\nDe tous les loups sont les plus dangereux?',
    created_date: '2019-06-20T19:25:28.182769Z',
    created_by: 2,
    modified_date: '2019-06-20T19:27:01.259476Z',
    modified_by: null,
    public: true,
    source_lang: 'fr',
    target_lang: 'fi'
  },
  {
    id: 2,
    title: 'Le Temps',
    body: 'Il fait soleil.',
    created_date: '2019-06-25T07:53:06.207938Z',
    created_by: 2,
    modified_date: '2019-06-25T07:53:38.831749Z',
    modified_by: null,
    public: true,
    source_lang: 'fr',
    target_lang: 'fi'
  }
]

const getAll = () => {
  return Promise.resolve(chapters)
}

export default { getAll }