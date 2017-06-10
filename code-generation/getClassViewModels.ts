﻿import {ClassViewModel} from "./view-models";
import TsSimpleAst from "./../src/main";
import {ClassDeclaration} from "./../src/main";
import {getMixinViewModels} from "./getMixinViewModels";

export function* getClassViewModels(ast: TsSimpleAst): IterableIterator<ClassViewModel> {
    console.log(ast.getDiagnostics().map(m => m.getMessageText()));
    const compilerSourceFiles = ast.getSourceFiles().filter(f => f.getFilePath().indexOf("src/compiler") >= 0);
    const classes = compilerSourceFiles.map(f => f.getClasses()).reduce((a, b) => a.concat(b), []);

    for (const c of classes) {
        yield {
            name: c.getName(),
            mixins: Array.from(getMixinViewModels(c)),
            path: c.getSourceFile().getFilePath()
        };
    }
}
