import { Injectable } from '@angular/core';

@Injectable()
export class StateService {
  public minimized: boolean;
  public priorities: any = null;
  public companyPriorities: any = null;
  public summary: any = null;
  public companySummary: any = null;
  public team: any = null;
  public tickets: any = null;
  public companyTickets: any = null;
  public badge: number = null;

  constructor() {
    // this.date = Math.floor(new Date().getTime() / 1000);
  }

  /**
   * Destorys any cached data
   */
  destroySession() {
    this.setPriorities(null);
    this.setCompanyPriorities(null);
    this.setSummary(null);
    this.setCompanySummary(null);
    this.setTeam(null);
    this.setOpenTickets(null);
    this.setCompanyOpenTickets(null);
    this.setBadge(null);
  }

  /**
   * Fetches the number to be displayed on the My Support Tickets badge
   */
  getBadge(): number {
    if (localStorage.getItem('badge') && localStorage.getItem('badge') !== '') {
      this.setBadge(Number(localStorage.getItem('badge')));
    }

    return this.badge;
  }

  /**
   * Sets the My Support Tickets badge
   * @param {number} badge [badge number]
   */
  setBadge(badge: number): void {
    localStorage.setItem('badge', String(badge));
    this.badge = badge;
  }

  /**
   * Forces a ticket to be added to the cache
   * @param {object} ticket [ticket]
   */
  addTicket(ticket: object): void {
    let tickets = this.getOpenTickets();
    let companyTickets = this.getCompanyOpenTickets();

    tickets.unshift(ticket[0]);
    companyTickets.unshift(ticket[0]);

    this.setOpenTickets(tickets);
    this.setCompanyOpenTickets(companyTickets);
  }

  /**
   * Forces a ticket to be removed to the cache
   * @param {object} ticket [ticket]
   */
  removeTicket(ticketID: number): void {
    let index = 0;
    for (const t of this.getOpenTickets()) {
      if (t.id === ticketID) {
        let array = this.getOpenTickets();
        array.splice(index, 1);
        this.setOpenTickets(array);
        break;
      }
      index += 1;
    }

    index = 0;
    for (const t of this.getCompanyOpenTickets()) {
      if (t.id === ticketID) {
        let array = this.getCompanyOpenTickets();
        array.splice(index, 1);
        this.setCompanyOpenTickets(array);
        break;
      }
      index += 1;
    }
  }

  /**
   * Sets user open tickets
   * @param {any} tickets
   */
  setOpenTickets(tickets: any): void {
    localStorage.setItem('tickets', JSON.stringify(tickets));
    this.tickets = tickets;
  }

  /**
   * Retrives user open tickets
   * @return {any}
   */
  getOpenTickets(): any {
    if (
      localStorage.getItem('tickets') &&
      localStorage.getItem('tickets') !== ''
    ) {
      this.setOpenTickets(JSON.parse(localStorage.getItem('tickets')));
    }

    return this.tickets;
  }

  /**
   * Sets company open tickets
   * @param {any} companyTickets
   */
  setCompanyOpenTickets(companyTickets: any): void {
    localStorage.setItem('companyTickets', JSON.stringify(companyTickets));
    this.companyTickets = companyTickets;
  }

  /**
   * Retrieves company open tickets
   * @return {any}
   */
  getCompanyOpenTickets(): any {
    if (
      localStorage.getItem('companyTickets') &&
      localStorage.getItem('companyTickets') !== ''
    ) {
      this.setCompanyOpenTickets(
        JSON.parse(localStorage.getItem('companyTickets'))
      );
    }

    return this.companyTickets;
  }

  /**
   * Sets user team
   * @param {any} team
   */
  setTeam(team: any): void {
    localStorage.setItem('team', JSON.stringify(team));
    this.team = team;
  }

  /**
   * Retrieves user team
   * @return {any} [description]
   */
  getTeam(): any {
    if (localStorage.getItem('team') && localStorage.getItem('team') !== '') {
      this.setTeam(JSON.parse(localStorage.getItem('team')));
    }

    return this.team;
  }

  /**
   * Sets hamburger menu minimized state
   * @param {boolean} minimized
   */
  setMinimized(minimized: boolean): void {
    localStorage.setItem('minimized', String(minimized));
    this.minimized = minimized;
  }

  /**
   * Retrieves hamburger minimized state
   * @return {boolean}
   */
  getMinimized(): boolean {
    if (
      localStorage.getItem('minimized') &&
      localStorage.getItem('minimized') !== ''
    ) {
      this.setMinimized(
        localStorage.getItem('minimized') === 'true' ? true : false
      );
    }

    return this.minimized;
  }

  /**
   * Sets user ticket priority ranking
   * @param {any} priorities
   */
  setPriorities(priorities: any): void {
    localStorage.setItem('priorities', JSON.stringify(priorities));
    this.priorities = priorities;
  }

  /**
   * Retrieves user ticket priority ranking
   * @return {any} [description]
   */
  getPriorities(): any {
    if (
      localStorage.getItem('priorities') &&
      localStorage.getItem('priorities') !== ''
    ) {
      this.setPriorities(JSON.parse(localStorage.getItem('priorities')));
    }

    return this.priorities;
  }

  /**
   * Sets company ticket priority ranking
   * @param {any} companyPriorities
   */
  setCompanyPriorities(companyPriorities: any): void {
    localStorage.setItem(
      'companyPriorities',
      JSON.stringify(companyPriorities)
    );
    this.companyPriorities = companyPriorities;
  }

  /**
   * Retrieves company ticket priority ranking
   * @return {any} [description]
   */
  getCompanyPriorities(): any {
    if (
      localStorage.getItem('companyPriorities') &&
      localStorage.getItem('companyPriorities') !== ''
    ) {
      this.setCompanyPriorities(
        JSON.parse(localStorage.getItem('companyPriorities'))
      );
    }

    return this.companyPriorities;
  }

  /**
   * Sets dashboard card user tickets summary
   * @param {any} summary
   */
  setSummary(summary: any): void {
    localStorage.setItem('summary', JSON.stringify(summary));
    this.summary = summary;
  }

  /**
   * Retrieves dashboard card user tickets summary
   * @return {any} [description]
   */
  getSummary(): any {
    if (
      localStorage.getItem('summary') &&
      localStorage.getItem('summary') !== ''
    ) {
      this.setSummary(JSON.parse(localStorage.getItem('summary')));
    }

    return this.summary;
  }

  /**
   * Sets dashboard card company tickets summary
   * @param {any} companySummary
   */
  setCompanySummary(companySummary: any): void {
    localStorage.setItem('companySummary', JSON.stringify(companySummary));
    this.companySummary = companySummary;
  }

  /**
   * Retrieves dashboard card user tickets summary
   * @return {any} [description]
   */
  getCompanySummary(): any {
    if (
      localStorage.getItem('companySummary') &&
      localStorage.getItem('companySummary') !== ''
    ) {
      this.setCompanySummary(
        JSON.parse(localStorage.getItem('companySummary'))
      );
    }

    return this.companySummary;
  }

  /**
   * Gets user dashboard cards using user summary
   * @return {any[]} [description]
   */
  getDashboardCards(): any[] {
    const summary = this.getSummary();
    const date: Date = new Date();

    return [
      {
        number: Number(summary[`${date.getFullYear()}-${date.getMonth() + 1}`]),
        text: 'Tickets this month'
      },
      {
        number: Number(summary[`${date.getFullYear()}`]),
        text: 'Tickets this year'
      },
      {
        number: Number(summary[`${date.getFullYear() - 1}`]),
        text: 'Tickets last year'
      }
    ];
  }

  /**
   * Gets company dashboard cards using company summary
   * @return {any[]} [description]
   */
  getCompanyDashboardCards(): any[] {
    const summary = this.getCompanySummary();
    const date: Date = new Date();

    return [
      {
        number: Number(summary[`${date.getFullYear()}-${date.getMonth() + 1}`]),
        text: 'Tickets this month'
      },
      {
        number: Number(summary[`${date.getFullYear()}`]),
        text: 'Tickets this year'
      },
      {
        number: Number(summary[`${date.getFullYear() - 1}`]),
        text: 'Tickets last year'
      }
    ];
  }

  /**
   * Gets bar graph data using user summary
   * @return {any[]} [description]
   */
  getBarData(): any[] {
    const summary = this.getSummary();
    const date: Date = new Date();
    let barInfo = [];

    let summaryLength = 0;
    for (const s in summary) {
      summaryLength++;
    }

    let counter = summaryLength - 12;

    for (const s in summary) {
      if (counter === 0) {
        if (s.length > 4) {
          const barObject = {
            name:
              s.length === 6
                ? this.getMonthAbbreviation(Number(s.slice(-1)))
                : this.getMonthAbbreviation(Number(s.slice(-2))),
            value: Number(summary[s])
          };

          barInfo.push(barObject);
        }
      } else {
        counter--;
      }
    }

    return barInfo;
  }

  /**
   * Gets bar graph data using company summary
   * @return {any[]} [description]
   */
  getCompanyBarData(): any[] {
    const summary = this.getCompanySummary();
    const date: Date = new Date();
    let barInfo = [];

    let summaryLength = 0;
    for (const s in summary) {
      summaryLength++;
    }

    let counter = summaryLength - 12;

    for (const s in summary) {
      if (counter === 0) {
        if (s.length > 4) {
          const barObject = {
            name:
              s.length === 6
                ? this.getMonthAbbreviation(Number(s.slice(-1)))
                : this.getMonthAbbreviation(Number(s.slice(-2))),
            value: Number(summary[s])
          };

          barInfo.push(barObject);
        }
      } else {
        counter--;
      }
    }

    return barInfo;
  }

  /**
   * Gets pie graph data using user summary
   * @return {any[]} [description]
   */
  getPieData(): any[] {
    const priorities = this.getPriorities();
    const pieInfo = [];

    for (const p in priorities) {
      const pieObject = {
        name: priorities[p].name.split(' ')[3],
        value: Number(priorities[p].count)
      };

      pieInfo.push(pieObject);
    }

    return pieInfo;
  }

  /**
   * Gets pie graph data using company summary
   * @return {any[]} [description]
   */
  getCompanyPieData(): any[] {
    const priorities = this.getCompanyPriorities();
    const pieInfo = [];

    for (const p in priorities) {
      const pieObject = {
        name: priorities[p].name.split(' ')[3],
        value: Number(priorities[p].count)
      };

      pieInfo.push(pieObject);
    }

    return pieInfo;
  }

  /**
   * Returns three-letter month abbreviation
   * @param  {number} month [month number]
   * @return {string}       [month abbreviation]
   */
  getMonthAbbreviation(month: number): string {
    switch (month) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
    }
  }
}
