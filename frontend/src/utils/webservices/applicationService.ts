import { singleton as axiosUtils } from '@/utils/axiosUtils'

export class ApplicationService {
  private static instanceField: ApplicationService

  protected server = 'elite'
  protected axiosUtils = axiosUtils

  public static getInstance () {
    if (!this.instanceField) {
      this.instanceField || (this.instanceField = new ApplicationService())
    }
    return this.instanceField
  }

  public async getVersion () {
    return axiosUtils.getResponse(this.server, 'application.version')
  }

  public async getDateTime () {
    return new Date((await axiosUtils.getResponse(this.server, 'application.datetime')).message)
  }

  public async crontabCheck (crontab: string, language: string, country: string): Promise<any> {
    const params = `crontab=${encodeURIComponent(crontab)}&language=${encodeURIComponent(language)}&country=${encodeURIComponent(country)}`
    console.log(params)
    return axiosUtils.getResponse(this.server, 'crontab.check', params)
  }
}

export const singleton = ApplicationService.getInstance()
