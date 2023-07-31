
interface CodecOptions {
	name: string
	load?(model: any, file: object, add?: boolean): void
	compile?(options?: object): void
	parse?(data: any, path: string): void
	export?(): void
	/**
	 * Generate a file name to suggest when exporting
	 */
	fileName?(): string
	startPath?(): string
	write?(content: any, path: string): void
	overwrite?(content: any, path: string, callback: ((path) => void)): void
	afterDownload?(path): void
	afterSave?(path): void

	extension: string
	/**
	 * Whether to remember the models exported using this codec
	 */
	remember: boolean
	load_filter?: {
		extensions: string[]
		type: 'json' | 'text'
		condition?: ConditionResolvable
	}
	/**
	 * List of export option inputs, based on the Dialog form API
	 */
	export_options?: {
		[key: string]: DialogFormElement
	}
	/**
	 * Default action that is used to export to the codec
	 */
	export_action?: Action
}

/**
 * A codec represents a specific file format that can be imported into and exported from Blockbench. The codec handles the compilation and parsing, as well as the loading and exporting logic
 */
declare class Codec extends Deletable {
	/**
	 * Creates a new codec
	 * @param id Codec ID
	 * @param options Codec options
	 */
	constructor(id: string, options: CodecOptions)

	/**
	 * Load a file into the program
	 * @param model 
	 * @param file 
	 * @param add 
	 */
	load?(model: any, file: object, add?: boolean): void
	/**
	 * Compiles the file content
	 * @param options 
	 */
	compile?(options?: object): any
	/**
	 * Takes the content of a file, and loads the model into the current Blockbench project
	 * @param data File content
	 * @param path File path
	 */
	parse?(data: any, path: string): void
	/**
	 * Opens the file browser to export a file of this type
	 */
	export?(): void
	/**
	 * Generate a file name to suggest when exporting
	 */
	fileName?(): string
	/**
	 * Generates the suggested file path. This is the path that the explorer opens in when exporting this type
	 */
	startPath?(): string
	/**
	 * Write the content of this file to the selected location. The default method can be overwritten to achieve custom behavior
	 * @param content File content, as generated by compile()
	 * @param path The file export path
	 */
	write?(content: any, path: string): void
	overwrite?(content: any, path: string, callback: ((path) => void)): void
	afterDownload?(path): void
	afterSave?(path): void

	/**
	 * Return the stored export option values of the current project
	 */
	getExportOptions(): {[key: string]: any}
	/**
	 * Prompt the user to enter their preferred export settings into the dialog
	 */
	promptExportOptions(): Promise<({[key: string]: any} | null)>

	/**
	 * Adds an event listener to the codec
	 * @param event_name The event type to listen for
	 * @param callback 
	 */
	on(event_name: string, callback: (data: object) => void): void
	/**
	 * Adds a single-use event listener to the codec
	 * @param event_name The event type to listen for
	 * @param callback 
	 */
	once(event_name: string, callback: (data: object) => void): void
	/**
	 * Removes an event listener from the codec
	 * @param event_name 
	 * @param callback 
	 */
	removeListener(event_name: string, callback: (data: object) => void): void
	dispatchEvent(data: object): void
	
	/**
	 * The display name of the codec
	 */
	name: string
	/**
	 * The default file extension that the codec uses
	 */
	extension: string
	/**
	 * Whether to remember files that use this codec in the recent models list
	 */
	remember: boolean
	/**
	 * If available, the action that is used to export files using this codec
	 */
	export_action?: Action

	/**
	 * List of export option inputs
	 */
	export_options: {
		[key: string]: DialogFormElement
	}

	/**
	 * Get a list of all possible extensions of all codecs
	 */
	static getAllExtensions(): string[]
}

declare const Codecs: {
	[id: string]: Codec
}
