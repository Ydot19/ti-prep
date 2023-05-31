import Difficulty from '@/models/enums';

interface IProblemRecord {
  id: string
  title: string
  title_slug: string
  difficulty: Difficulty
  mastered: string
}

export default IProblemRecord;
