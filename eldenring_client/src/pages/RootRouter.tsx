import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { FormPageType } from 'define';

import RootContainer from './RootContainer';

import WeaponList from './Weapon/WeaponList';
import WeaponForm from './Weapon/WeaponForm';
import WeaponDetail from './Weapon/WeaponDetail';

import SkillList from './Skill/SkillList';
import SkillForm from './Skill/SkillForm';
import SkillDetail from './Skill/SkillDetail';

import MagicList from './Magic/MagicList';
import MagicForm from './Magic/MagicForm';
import MagicDetail from './Magic/MagicDetail';

import PrayList from './Pray/PrayList';
import PrayForm from './Pray/PrayForm';
import PrayDetail from './Pray/PrayDetail';

export default function RootRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RootContainer />}>
          <Route index element={<WeaponList />}/>
          <Route path='/weapon' element={<WeaponList />} />
          <Route path='/weapon/create' element={<WeaponForm pageType={FormPageType.create} />} />
          <Route path='/weapon/:weaponId' element={<WeaponDetail />} />
          <Route path='/weapon/:weaponId/update' element={<WeaponForm pageType={FormPageType.update} />} />

          <Route path='/skill' element={<SkillList />} />
          <Route path='/skill/create' element={<SkillForm pageType={FormPageType.create} />} />
          <Route path='/skill/:skillId' element={<SkillDetail />} />
          <Route path='/skill/:skillId/update' element={<SkillForm pageType={FormPageType.update} />} />

          <Route path='/magic' element={<MagicList />} />
          <Route path='/magic/create' element={<MagicForm pageType={FormPageType.create} />} />
          <Route path='/magic/:magicId' element={<MagicDetail />} />
          <Route path='/magic/:magicId/update' element={<MagicForm pageType={FormPageType.update} />} />

          <Route path='/pray' element={<PrayList />} />
          <Route path='/pray/create' element={<PrayForm pageType={FormPageType.create} />} />
          <Route path='/pray/:prayId' element={<PrayDetail />} />
          <Route path='/pray/:prayId/update' element={<PrayForm pageType={FormPageType.update} />} />
        </Route>
      </Routes>
    </Router>
  );
}