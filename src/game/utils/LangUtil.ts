export class LangUtil {

    public static lang: any;

    public static keys = {
        startButton: 'startButton',
        startLabel: 'startLabel'
    }

    static get(key: string): string {
        if (this.lang && this.lang[key]) {
            return this.lang[key];
        } else {
            return `${key} not found`;
        }
    }

}
