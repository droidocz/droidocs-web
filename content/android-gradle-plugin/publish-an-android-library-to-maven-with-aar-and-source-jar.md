---
metaTitle: Publish an Android library to Maven with aar and source jar
tags:
- gradle
- android-library
- maven-publish
title: Publish an Android library to Maven with aar and source jar
---

## Context

Can somebody give me a hint on how to use the `maven-publish` gradle plugin to publish a `com.android.library` project/module with aar and source jar? I am able to do this with the old maven plugin - but I would like to use the new `maven-publish` plugin.



---

A little tweak to dskinners answer with correct dependency generation:



```
apply plugin: 'maven-publish'

task sourceJar(type: Jar) {
    from android.sourceSets.main.java.srcDirs
    classifier "source"
}

publishing {
    publications {
        bar(MavenPublication) {
            groupId 'com.foo'
            artifactId 'bar'
            version '0.1'
            artifact(sourceJar)
            artifact("$buildDir/outputs/aar/bar-release.aar")
            pom.withXml {
                def dependenciesNode = asNode().appendNode('dependencies')
                //Iterate over the compile dependencies (we don't want the test ones), adding a <dependency> node for each
                configurations.compile.allDependencies.each {
                    if(it.group != null && (it.name != null || "unspecified".equals(it.name)) && it.version != null)
                    {
                        def dependencyNode = dependenciesNode.appendNode('dependency')
                        dependencyNode.appendNode('groupId', it.group)
                        dependencyNode.appendNode('artifactId', it.name)
                        dependencyNode.appendNode('version', it.version)
                    }
                }
            }
        }
    }
    repositories {
        maven {
            url "$buildDir/repo"
        }
    }
}

```

And you can change `version` and `groupId` by defining:



```
version = '1.0.0'
group = 'foo.bar'

```


---

## Notes

- Instead of hardcoding the aar filename one can use `artifact bundleRelease`. Also the condition `(it.name != null || "unspecified".equals(it.name))` does not look correct. Did you mean `(it.name != null && "unspecified" != it.name)`?
