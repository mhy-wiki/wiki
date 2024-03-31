import TodayMaterial from '../../miao-plugin/apps/wiki/TodayMaterial.js';
import CalendarSr from '../../miao-plugin/apps/wiki/CalendarSr.js';
import Calendar from '../../miao-plugin/apps/wiki/Calendar.js';
import CharWiki from './wiki/CharWiki.js';
import set from '../utils/setting.js';

let expandwiki = set.getCfg('wiki')?.expandWiki;

export class wiki extends plugin{
  constructor () {
    super({
      name: '喵喵:角色资料',
      dsc: '喵喵:角色资料',
      event: 'message',
      priority: -20,
      rule: [
        {
          reg: '#喵喵扩展WIKI',
          fnc: 'wiki'
        },
        {
          reg: '^(#|喵喵)+(日历|日历列表)$',
          fnc: 'calendar'
        },
        {
          reg: '^#(星铁)+(日历|日历列表)$',
          fnc: 'calendarsr'
        },
        {
          reg: '^#(今日|今天|每日|我的)*(素材|材料|天赋)[ |0-9]*$',
          fnc: 'todaymaterial'
        }
      ]
    }) 
  }

  accept (e) {
    if (!expandwiki) return false;
    e.original_msg = e.original_msg || e.msg;
    if (CharWiki.check(e, e.original_msg) === true) return true;
  }

  async wiki(e) {
    if (!expandwiki) return false;
    await CharWiki.wiki(e);
  }

  async calendar(e) {
    if (!expandwiki) return false;
    await Calendar.render(e);
  }

  async calendarsr(e) {
    if (!expandwiki) return false;
    await CalendarSr.render(e);
  }

  async todaymaterial(e) {
    if (!expandwiki) return false;
    await TodayMaterial.render(e);
  }
}